const toArray = (item) => {
    if (Array.isArray(item)) {
        return item;
    }

    return [item];
}

module.exports = {
    toArray,
};