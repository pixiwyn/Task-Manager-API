/**
 * Cancel email template for deleted accounts
 * 
 * @param {string} name 
 * 
 * @returns {string}
 */
const cancelEmail = (name) => {
    return `
        Hi ${name},\n\n

        Your account for Task Manager has been deleted.\n\n

        --\n
        Kaitlyn Marshall
    `
}


module.exports = { cancelEmail };