# Node.js URL Shortener

This is a simple URL shortener app built with Node.js and Express.js. The app allows users to create custom aliases for long URLs, making them easier to share and remember.

## Features

- Create aliases for URLs
- Retrieve URLs using their aliases
- Get a list of all aliases and their usage statistics
## Installation

1. Clone the repository to your local machine
2. Run `npm install` to install the dependencies
3. Run `docker-compose up -d` in the docker directory to start the MongoDB instance
3. Set the `MONGO_CONNECTION_STRING` and `PORT` environment variables
4. Run `npm start` to start the app
5. Access the app at `http://localhost:PORT`

## Endpoints

- `POST /url-shortener/v1/aliases` - Create a new alias for a URL
- `GET /url-shortener/v1/:aliasName` - Redirect to the original URL associated with an alias
- `GET /url-shortener/v1/aliases` - Get a list of all aliases and their usage statistics

## Usage

### Creating an Alias

To create an alias for a URL, send a POST request to the `/url-shortener/v1/aliases` endpoint with the following JSON payload:

```json
{
  "url": "https://google.com",
  "alias": "gg"
}
```
The url property should be the URL that you want to create an alias for, and the alias property should be the custom alias that you want to use.

### Retrieving a URL
To retrieve a URL using its alias, simply make a GET request to the `/url-shortener/v1/:aliasName` endpoint, where `:aliasName` is the alias that you want to retrieve.

### Getting a List of Aliases
To get a list of all aliases and their usage statistics, make a GET request to the `/url-shortener/v1/aliases` endpoint.
```json
  [{
    "id": "f4f31fe0-4b64-4a93-8945-9e7063cac090",
    "alias": "add",
    "url": "https://www.adesso.de",
    "statistics": {
      "created": "2023-01-21T14:09:07.597Z",
      "lastUsed": "2023-04-15T14:46:56.818Z",
      "invoked": 4
    }
  },
  {
    "id": "62c3abab-0288-42b9-b56f-672b41ac7d8e",
    "alias": "gg",
    "url": "https://google.com",
    "statistics": {
      "created": "2023-04-10T15:14:17.425Z",
      "lastUsed": "2023-04-15T15:25:54.407Z",
      "invoked": 1
    }
  }]
```
