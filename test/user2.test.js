let {createUser,loginUser,validateEmail,getDataAsync} = require('../views/user');
let axios = require('axios');
jest.mock('axios');

describe("User",()=>{
    it('valid email',() => {
        let validOrNot = validateEmail("farzisiboy@gmail.com");
        expect(validOrNot).toBe(true);
    })

    it('invalid email',() => {
        let validOrNot = validateEmail("cjsdvcjvcjhchjd");
        expect(validOrNot).toBe(false);
    })
    
    
    it('test async get data', async () => {
        let expectedValue = { userId: 1, id: 1, title: 'Test Title', body: 'Test Body' };
        let result = await getDataAsync('https://jsonplaceholder.typicode.com/users/1');
        expect(result).toEqual(expectedValue);
    })
      
    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Unable to fetch user data';
        axios.get.mockRejectedValue(new Error(errorMessage));
        try {
          await getDataAsync('https://jsonplacehol.com/posts/1');
        } catch (e) {
          expect(e.message).toBe(errorMessage);
        }
    });
})