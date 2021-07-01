// Helper function to check if object is empty
const isEmpty = (obj) => Object.keys(obj).length === 0;

const generateSorter = ({attr, ascending}) => {
  return ascending ? 
    ((a, b) => a[attr] > b[attr] ? 1 : -1) :
    ((a , b) => a[attr] > b[attr] ? -1 : 1)
}

export { isEmpty, generateSorter }