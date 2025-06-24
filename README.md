# nxthdr.dev

> [!WARNING]
> Currently in early-stage development.

## Development

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
   - This will use the `.env.development` configuration

## Production Docker Build

To build the Docker image with production environment variables:

```bash
# From the project root directory
docker build -t nxthdr/website:latest -f docker/Dockerfile .
```

The Docker build process will use the `.env.production` file from the repository.

If you need to change the environment settings for production:

1. Edit the `.env.production` file with your values
2. Commit the changes to your repository
3. Build the Docker image

This approach keeps things simple and transparent.

