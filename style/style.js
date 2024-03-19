import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Angkor-Regular',
  },
  header: {
    backgroundColor: '#C91D1D',
    flexDirection: 'row',
    fontFamily: 'Angkor-Regular',
    marginBottom: 0,
  },
  footer: {
    backgroundColor: '#C91D1D',
    flexDirection: 'row',
    fontFamily: 'Angkor-Regular',
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    textShadowColor:'#FFEE0B',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
    fontFamily: 'Angkor-Regular',
  },
  label: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    margin: 2,
    fontFamily: 'Angkor-Regular'
  },
  rules: {
    color: '#ab1a1a',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'MochiyPopPOne-Regular',
    
  },
  author: {
    color: '#fff',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Angkor-Regular'
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MochiyPopPOne-Regular',
    margin: 10,
    color: 'black',
  },
  score: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontFamily: 'Angkor-Regular',
    margin: 5,
  },
  home: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#C91D1D",
    width: 300,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#fff",
    fontSize: 20,
    fontFamily: 'Angkor-Regular',
  }
});