export async function getMessages() {
  const res = await fetch('/api/messages');
  const data = await res.json();

  if (!res.ok) {
    return Promise.reject(data);
  }

  return data.messages;
}

export async function createMessage(message) {
  const res = await fetch('/api/messages/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  const data = await res.json();

  if (!res.ok) {
    return Promise.reject(data);
  }

  return data.message;
}
