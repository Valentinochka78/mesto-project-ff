export const config = { 
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19", 
  headers: { 
    authorization: "083804d0-404c-4905-a721-c9c4c4534d5a", 
    "Content-Type": "application/json", 
  }, 
}; 

const handleResponse = async (res) => { 
  if (!res.ok) { 
    throw new Error(`Ошибка ${res.status}`); 
  } 
  return res.json(); 
}; 

export const getUserInfo = async () => { 
  const res = await fetch(`${config.baseUrl}/users/me, { headers: config.headers }`); 
  return handleResponse(res);
}; 

export const getCards = async () => { 
  const res = await fetch(`${config.baseUrl}/cards, { headers: config.headers }`); 
  return handleResponse(res);
}; 

export const setLike = async (cardId) => { 
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: "PUT", 
    headers: config.headers, 
  }); 
  return handleResponse(res);
}; 

export const deleteLike = async (cardId) => { 
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: "DELETE", 
    headers: config.headers, 
  }); 
  return handleResponse(res);
}; 

export const deleteOwnCard = async (cardId) => { 
  const res = await fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: "DELETE", 
    headers: config.headers, 
  }); 
  return handleResponse(res);
}; 

export const updateAvatar = async (avatar) => { 
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, { 
    method: "PATCH", 
    headers: config.headers, 
    body: JSON.stringify({ avatar }),
  }); 
  return handleResponse(res);
}; 

export const postCard = async ({ name, link }) => { 
  const res = await fetch(`${config.baseUrl}/cards`, { 
    method: "POST", 
    headers: config.headers, 
    body: JSON.stringify({ name, link }),
  }); 
  return handleResponse(res);
}; 

export const editProfileInfo = async ({ name, about }) => { 
  const res = await fetch(`${config.baseUrl}/users/me`, { 
    method: "PATCH", 
    headers: config.headers, 
    body: JSON.stringify({ name, about }),
  }); 

  return handleResponse(res);
};