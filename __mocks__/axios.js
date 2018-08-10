import topstories from './topstories.json';
import item from './item.json';

const TOP_STORIES_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/topstories.json';


const API = {
  get: jest.fn((url) => {
    switch (url) {
      case TOP_STORIES_ENDPOINT:
        return Promise.resolve({
          data: topstories
        });
      default:
        return Promise.resolve({
          data: item
        })
    
    }
  }),
  all:jest.fn((arr)=>{
      return Promise.all(arr);
  })
};
module.exports = API;