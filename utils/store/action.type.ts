export default {
  mencariId: state => id => {
    return state.data.find(obj => {
      return obj.id === id;
    });
  }
};
