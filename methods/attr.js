/**
 * Get a page/fragmwnt attribute
 *
 * @param {String} path - Object value path
 * @param {*} fallback - Fallback value
 * @param {Object} object - The object to retrieve the value from
 *
 * @returns {String|Array}
 */
export function attr(path, fallback = undefined, object = false) {
    if (!object) {
        object = this;
        // Traverse the tree until we find a data object
        while (!object.page && !object.fragment && object.$parent) {
            object = object.$parent;
        }
        // Return either the page or fragment data
        object = object.page || object.fragment;
    }

    // Search the data object for the attribute requested
    const attribute = get(object, path);
    
    return 
        // Return value if it's a standard attribute type
        (attribute || {}).value
        // Return the instance if it's a selectable/repeatable section
        || (attribute || {}).instance
        // Return the full attribute if it's a different data type
        || attribute
        // Otherwise return the fallback
        || fallback;
}
