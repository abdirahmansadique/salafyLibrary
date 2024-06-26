
export const UseLocalStorage = (key: string) => {
    const setItem = (value: any) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getItem = () => {
      try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : [];
      } catch (error) {
        console.log(error);
        return [];
      }
    };
  
    const deleteItem = () => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem, getItem, deleteItem };
  };
  