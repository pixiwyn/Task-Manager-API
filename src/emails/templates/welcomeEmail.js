/**
 * Welcome email template for new accounts
 * 
 * @param {string} name 
 * 
 * @returns {string}
 */
const welcomeEmail = (name) => {
    return `
        Hi ${name},\n\n

        Thanks for signing up for Task Manager. 
        Task Manager isn't a real product. It's meant to be a demo product.
        All data entered into Task Manager will periodically be deleted.\n\n

        --\n
        Kaitlyn Marshall
    `
}

module.exports = { welcomeEmail };