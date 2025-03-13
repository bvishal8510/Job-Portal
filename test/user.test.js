let {createUser,loginUser,validateEmail,getDataAsync} = require('../views/user');
let axios = require('axios');
jest.mock('axios');

test('valid email',() => {
    let validOrNot = validateEmail("farzisiboy@gmail.com");
    expect(validOrNot).toBe(true);
})

test('invalid email',() => {
    let validOrNot = validateEmail("cjsdvcjvcjhchjd");
    expect(validOrNot).toBe(false);
})


test('test async get data', async () => {
    let expectedValue = { userId: 1, id: 1, title: 'Test Title', body: 'Test Body' };
    let result = await getDataAsync('https://jsonplaceholder.typicode.com/users/1');
    expect(result).toEqual(expectedValue);
})

test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Unable to fetch user data';
    axios.get.mockRejectedValue(new Error(errorMessage));
    try {
      await getDataAsync('https://jsonplacehol.com/posts/1');
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
});

test.each([[1, 1, 2], [-1, 1, 0], [3, 2, 6]])( 
    'Does %i + %i equals %i', (a, b, expectedResult) => { 
      expect(a + b).toBe(expectedResult); 
});

describe("create user",()=>{
    let res;
    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
    })

    test.each([["baghel.vishl123@gmail.com","password",""],["","password","candidate"],["baghel.vishl123@gmail.com","","candidate"]])(
        "are %i, %i, %i valid inputs", async (a,b,c)=>{
        let req = {body : {email : a, password: b, role: c}};
    
        await createUser(req, res);
    
        expect(res.send).toHaveBeenCalledWith({
            message: "BAD REQUEST: either username or password or role missing"
        });
        expect(res.status).toHaveBeenCalledWith(400);
    })
})