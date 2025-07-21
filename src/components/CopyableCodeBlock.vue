<template>
  <div class="copyable-code-block-container">
    <div class="code-header">
      <div class="code-header-buttons">
        <button
          v-if="executable"
          class="action-button run-button"
          :class="{ 'loading': executing }"
          @click="executeCommand"
          :disabled="executing"
        >
          {{ executing ? 'Running...' : 'Run' }}
        </button>
        <button
          class="action-button copy-button"
          :class="{ 'copied': copied }"
          @click="copyToClipboard"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <div class="code-content">
      <pre class="code-block">{{ code }}</pre>
    </div>

    <!-- Output section -->
    <div v-if="showOutput && (output || error)" class="output-section">
      <div class="output-header">
        <span class="output-title">Output:</span>
        <button
          class="action-button clear-button small"
          @click="clearOutput"
        >
          Clear
        </button>
      </div>
      <template v-if="isCsvOutput && parsedCsv">
        <div class="csv-container">
          <table class="csv-table">
            <thead>
              <tr>
                <th v-for="header in parsedCsv.headers" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in parsedCsv.rows" :key="i">
                <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <pre v-else-if="output" class="output-content success">{{ output }}</pre>
      <pre v-if="error" class="output-content error">{{ error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props interface
interface Props {
  code: string; // The code string to display and copy (preserves line breaks)
  executable?: boolean; // Whether the code can be executed
}

const props = withDefaults(defineProps<Props>(), {
  executable: false,
});

// Emits interface
interface Emits {
  executionComplete: [result: { output: string; error: string | null; success: boolean }];
}

const emit = defineEmits<Emits>();

// Reactive state
const copied = ref(false);
const executing = ref(false);
const output = ref<string>('');
const error = ref<string>('');
const showOutput = ref(false);

// Computed properties
const isCsvOutput = computed(() => {
  // Heuristic: output contains at least one comma and two lines
  if (!output.value) return false;
  const lines = output.value.trim().split(/\r?\n/);
  return lines.length > 1 && lines[0].includes(',');
});

// Helper function to parse CSV with proper quote handling
const parseCsvLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator outside quotes
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }

  result.push(current);
  return result;
};

const parsedCsv = computed(() => {
  if (!isCsvOutput.value) return null;
  const lines = output.value.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map(line => parseCsvLine(line));
  return { headers, rows };
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    // Reset after 2 seconds
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy to clipboard: ', err);
  }
};

const executeCommand = async () => {
  if (!props.executable || executing.value) return;

  executing.value = true;
  output.value = '';
  error.value = '';
  showOutput.value = true;

  try {
    // Parse the curl command to extract HTTP details
    const request = parseCurlCommand(props.code);

    if (!request) {
      throw new Error('Could not parse command');
    }

    // Add Origin header for CORS compliance in production
    const fetchHeaders = {
      ...request.headers,
      'Origin': window.location.origin
    };

    const response = await fetch(request.url, {
      method: request.method,
      headers: fetchHeaders,
      body: request.body,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const jsonData = await response.json();
      output.value = JSON.stringify(jsonData, null, 2);
    } else {
      output.value = await response.text();
    }

    // Emit execution complete event with success
    emit('executionComplete', {
      output: output.value,
      error: null,
      success: true
    });
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred';

    // Emit execution complete event with error
    emit('executionComplete', {
      output: '',
      error: error.value,
      success: false
    });
  } finally {
    executing.value = false;
  }
};

const clearOutput = () => {
  output.value = '';
  error.value = '';
  showOutput.value = false;
};

// Parse curl command to extract HTTP request details
const parseCurlCommand = (curlCommand: string) => {
  try {
    const lines = curlCommand.split('\n').map(line => line.trim()).filter(line => line);

    let url = '';
    let method = 'GET';
    const headers: Record<string, string> = {};
    let body: string | undefined;

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Skip curl command itself and echo commands
      if (line.startsWith('curl') || line.startsWith('echo')) {
        // Extract URL from curl command - handle both single and double quotes
        const urlMatch = line.match(/curl[^'"]*['"]([^'"]+)['"]/) || line.match(/curl[^']*'([^']+)'/);
        if (urlMatch) {
          url = urlMatch[1];
        } else {
          // Try without quotes
          const parts = line.split(/\s+/);
          const urlPart = parts.find(part => part.startsWith('http'));
          if (urlPart) {
            url = urlPart.replace(/\\$/, ''); // Remove trailing backslash
          }
        }

        // Parse flags in the same line
        if (line.includes('-X ')) {
          const methodMatch = line.match(/-X\s+(\w+)/);
          if (methodMatch) {
            method = methodMatch[1];
          }
        }
        if (line.includes('-u ')) {
          const authMatch = line.match(/-u\s+["']([^"']+)["']?/);
          if (authMatch) {
            headers['Authorization'] = 'Basic ' + btoa(authMatch[1]);
          }
        }
        if (line.includes('-H ')) {
          const headerMatches = line.matchAll(/-H\s+["']([^:]+):\s*([^"']+)["']?/g);
          for (const match of headerMatches) {
            headers[match[1]] = match[2].replace(/["']$/, '');
          }
        }

        i++;
        continue;
      }

      // Parse flags
      if (line.startsWith('-X ')) {
        method = line.substring(3).trim().replace(/^["']|["']$/g, '');
      } else if (line.startsWith('-u ')) {
        // Handle basic auth
        const authMatch = line.match(/-u\s+['"]([^'"]+)['"]?/);
        if (authMatch) {
          headers['Authorization'] = 'Basic ' + btoa(authMatch[1]);
        }
      } else if (line.startsWith('-H ')) {
        const headerMatch = line.match(/-H\s+['"]([^:]+):\s*([^'"]+)['"]?/);
        if (headerMatch) {
          headers[headerMatch[1]] = headerMatch[2].replace(/['"]$/, '');
        }
      } else if (line.startsWith('-d ')) {
        // Extract body - handle multi-line data properly
        let bodyStr = '';

        // Check if the data starts on the same line with quotes
        const sameLineMatch = line.match(/-d\s+["'](.*)$/);
        if (sameLineMatch) {
          const content = sameLineMatch[1];
          const quoteChar = line.includes('"') ? '"' : "'";

          // If it ends with a quote, it's a single line
          if (content.endsWith(quoteChar)) {
            bodyStr = content.slice(0, -1); // Remove closing quote
          } else {
            // Multi-line - this line has the opening content
            bodyStr = content;

            // Continue reading lines until we find the closing quote
            i++;
            while (i < lines.length) {
              const currentLine = lines[i];

              // Check if this line ends with the closing quote
              if (currentLine.endsWith(quoteChar)) {
                // Add the line content without the closing quote
                bodyStr += '\n' + currentLine.slice(0, -1);
                break;
              } else {
                // Add the full line
                bodyStr += '\n' + currentLine;
              }
              i++;
            }
          }
        } else {
          // Handle case where -d flag doesn't have content on same line
          const flagMatch = line.match(/-d\s*$/);
          if (flagMatch) {
            // Look for content on next lines
            i++;
            if (i < lines.length) {
              const nextLine = lines[i];
              const quoteMatch = nextLine.match(/^["'](.*)$/);
              if (quoteMatch) {
                const content = quoteMatch[1];
                const quoteChar = nextLine.charAt(0);

                if (content.endsWith(quoteChar)) {
                  bodyStr = content.slice(0, -1);
                } else {
                  bodyStr = content;
                  i++;
                  while (i < lines.length) {
                    const currentLine = lines[i];
                    if (currentLine.endsWith(quoteChar)) {
                      bodyStr += '\n' + currentLine.slice(0, -1);
                      break;
                    } else {
                      bodyStr += '\n' + currentLine;
                    }
                    i++;
                  }
                }
              }
            }
          }
        }

        body = bodyStr.trim();
      } else if (line.includes('--data-binary @-')) {
        // Handle ClickHouse query style
        const queryLines = [];
        let j = 0;
        while (j < lines.length) {
          if (lines[j].includes('"""')) {
            j++;
            while (j < lines.length && !lines[j].includes('"""')) {
              queryLines.push(lines[j]);
              j++;
            }
            break;
          }
          j++;
        }
        if (queryLines.length > 0) {
          body = queryLines.join('\n').trim();
          method = 'POST';
          headers['Content-Type'] = 'text/plain';
        }
      }

      i++;
    }

    if (!url) return null;

    return { url, method, headers, body };
  } catch (err) {
    console.error('Error parsing curl command:', err);
    return null;
  }
};
</script>

<style scoped>
.copyable-code-block-container {
  position: relative;
  margin: 1.5rem 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  background: #1e1e1e;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.code-header-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 60px;
  font-weight: 500;
}

.run-button {
  background-color: #10b981;
  color: white;
}

.run-button:hover:not(:disabled) {
  background-color: #059669;
}

.run-button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}

.run-button.loading {
  background-color: #6b7280;
  cursor: wait;
}

.copy-button {
  background-color: #3b82f6;
  color: white;
}

.copy-button:hover {
  background-color: #2563eb;
}

.copy-button.copied {
  background-color: #10b981;
  cursor: default;
}

.copy-button.copied:hover {
  background-color: #10b981;
}

.clear-button {
  background-color: #6b7280;
  color: white;
}

.clear-button:hover {
  background-color: #4b5563;
}

.action-button.small {
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  min-width: 50px;
}

.code-content {
  background: #1e1e1e;
  border-radius: 0 0 8px 8px;
  border-top: none;
  color: #e6e6e6;
  box-shadow: none;
}

.code-block {
  margin: 0;
  padding: 1rem;
  background: none;
  border: none;
  font-family: 'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
  word-break: normal;
  color: #e6e6e6;
}

.output-section {
  border-top: 1px solid #374151;
  background: #1e1e1e;
  border-radius: 0 0 8px 8px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #3B82F6;
  border-bottom: 1px solid #374151;
}

.output-title {
  font-weight: 600;
  color: #d1d5db;
  font-size: 0.9rem;
}

.output-content {
  margin: 0;
  padding: 1rem;
  font-family: 'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  overflow-y: auto;
  white-space: pre;
  word-break: normal;
  max-height: 400px;
  background: #1e1e1e;
  color: #e6e6e6;
}

.output-content.success {
  border-left: 4px solid #10b981;
}

.output-content.error {
  border-left: 4px solid #ef4444;
}

/* CSV table styling - consistent with dark theme */
.csv-container {
  background: #1e1e1e;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
}

.csv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin: 0;
  background: #1e1e1e;
  color: #e6e6e6;
  font-family: 'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
}
.csv-table th, .csv-table td {
  border-bottom: 1px solid #374151;
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: top;
}
.csv-table th {
  background: #262626;
  font-weight: 600;
  color: #d1d5db;
  font-size: 0.8rem;
  letter-spacing: 0.025em;
  border-bottom: 2px solid #4b5563;
}
.csv-table td {
  background: #1e1e1e;
  color: #e6e6e6;
}
.csv-table tr:nth-child(even) td {
  background: #262626;
}
.csv-table tr:hover td {
  background: #374151;
}


</style>
