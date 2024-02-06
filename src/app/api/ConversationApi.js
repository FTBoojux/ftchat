import MyFetch from './MyFetch';

export const fetchConversationList = () => {
    return new Promise((resolve, reject) => {
      MyFetch(`/api/conversations/`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }