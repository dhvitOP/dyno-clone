const { model } = require('mongoose');

class Profile {
  backgroundURL = 'https://cdn.pixabay.com/photo/2019/04/30/10/47/background-4168284_960_720.jpg';
  colors = {
    primary: '#000000',
    secondary: '#FFFFFF'
  }
}

module.exports = model('user', {
  _id: String,
  profile: { type: Object, default: new Profile() },
  coins: { type: Number, default: 0 }  
});
