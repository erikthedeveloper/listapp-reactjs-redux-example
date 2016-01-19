import _request from 'superagent';

const baseUrl = 'http://localhost:3000';

/**
 * Make an HTTP request! Ultra light wrapper around Superagent for baseUrl.
 * @link http://visionmedia.github.io/superagent/#request-basics
 * @param method
 * @param uri
 * @return {Request}
 */
export default function request(method, uri) {
  return _request(method, `${baseUrl}/${uri.replace(/\//, '')}`)
}
