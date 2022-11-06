import supertest from 'supertest';
import MyApp from '../index';
import RsizeImage from '../classes/resize';

const req = supertest(MyApp);
//- Test home page on server
describe('Test home page on server!', () => {
  it('Get home page successfully.', async () => {
    const res = await req.get('/');
    expect(res.status).toBe(200);
  });
});

//- Check if the link is missing a query
describe('Check if the link is missing a query!', () => {
  it('It has been confirmed that the link must contain the querys.', async () => {
    const res = await req.get('/api/images');
    expect(res.status).toBe(400);
  });
});

//- Check image processing method
describe('Check image processing method!', () => {
  it('Verify that the image processing method has been successfully completed.', async () => {
    const testfilename = 'test.png';
    const ri = new RsizeImage(testfilename);
    const testoutput = await ri.resize(350, 350);
    expect(testoutput).toBe('test_w350_h350.png');
  });
});

//- Check the resize of the default image
describe('Check the resize of the default image!', () => {
  it('The default image size has been successfully changed.', async () => {
    const res = await req.get(
      '/api/images?filename=test.png&width=150&height=150'
    );
    expect(res.status).toBe(200);
  });
});
