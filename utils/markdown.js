/**
 * Escapes markdown that may be present in a username. Any of *, _, `, ~~, \, ||, > gets a backslash inserted before it.
 * Achtung! This is different from the existing escapeMarkdown methods in the theo or online! It escapes different
 * things and doesn't kill existing backslashes!
 * @param {string} text The unescaped text
 * @returns The input text, but with all markdown that is possible in usernames escaped
 */
function escapeUsernameMarkdown(text) {
    return text.replace(/(\*|_|`|~~|\\|\|\||>)/g, '\\$1'); // escape *, _, `, ~~, \, ||, >
}

/**
 * Escapes any Discord markdown in the input. Currently a wrapper for this.escapeUsernameMarkdown() but this method
 * exists for future expansion (e.g. sanitizing mentions out of messages)
 * @param {string} text The unescaped text
 * @returns The input text, escaped
 */
function escape(text) {
    return escapeUsernameMarkdown(text);
}

module.exports = {
    escapeUsernameMarkdown,
    escape,
};