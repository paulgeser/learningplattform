

var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const Constants = {
    url: url,
    localStorageItemNames: {
        username: 'APP_USERNAME'
    }
}