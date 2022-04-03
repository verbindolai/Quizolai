

// describe('ObjectID Test', () => {
//     it('should test a non valid objectID', () => {

//         const req = {
//             params: {
//                 id: 'invalid-ID',
//             }
//         } as any as Request;

//         const res = {
//             status: jest.fn((statusCode) => {
//                 res.statusCode = statusCode;
//                 return res;
//             }),
//             send: jest.fn().mockReturnThis(),
//         } as any as Response;

//         expect(checkObjectID(req, res, () => { })?.statusCode).toBe(400);
//     });
// });

// describe('ObjectID Test', () => {
//     it('should test a valid objectID', () => {

//         const req = {
//             params: {
//                 id: '61eec9ae3f05d4d1db9ca010',
//             }
//         } as any as Request;

//         const res = {
//             status: jest.fn((statusCode) => {
//                 res.statusCode = statusCode;
//                 return res;
//             }),
//             send: jest.fn().mockReturnThis(),
//         } as any as Response;

//         expect(checkObjectID(req, res, () => { })?.statusCode).not.toBe(400);
//         expect(checkObjectID(req, res, () => { })).toBe(undefined);
//     });
// });