import request from 'superagent';

const baseUrl = 'http://localhost:3000';

function _request(method, uri) {
  return request(method, `${baseUrl}/${uri}`)
}

export function getLists(query = {}) {
  return _request('GET', 'lists')
    .query({...query, _embed: 'items'});
}

export function createList(data) {
  return _request('POST', 'lists')
    .send(data);
}

export function updateList(id, data) {
  return _request('PATCH', `lists/${id}`)
    .send(data);
}

export function deleteList(id) {
  return _request('DELETE', `lists/${id}`);
}

export function createListItem(listId, data) {
  return _request('POST', `lists/${listId}/items`)
    .send(data);
}

export function updateListItem(listId, id, data) {
  return _request('PATCH', `items/${id}`)
    .send(data);
}

export function deleteListItem(listId, id) {
  return _request('DELETE', `items/${id}`);
}
