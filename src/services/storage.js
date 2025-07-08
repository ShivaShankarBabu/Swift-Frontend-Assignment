export const getSavedState = () => {
  try {
    const serializedState = localStorage.getItem('dashboardState');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    return null;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dashboardState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};