export const isEmailValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isNameValid = (name) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
};

export const validateUSPhoneNumber = (phoneNumber) => {
    const re = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
    return re.test(phoneNumber);
}