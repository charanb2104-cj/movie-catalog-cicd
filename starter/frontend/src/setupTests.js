// Mock global fetch for Jest testing environment
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        movies: [
          { id: '123', title: 'Top Gun: Maverick' },
          { id: '456', title: 'Sonic the Hedgehog' },
          { id: '789', title: 'A Quiet Place' },
        ],
      }),
  })
);
