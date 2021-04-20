import { StyleSheet } from "react-native";

export default StyleSheet.create({
  p: {
    fontFamily: 'vazir',
  },
  b: {
    fontFamily: 'vazir-bold',
  },
  page: {
    height: "100vh",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F0F4C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    shadowColor: "#B0BEC5",
    backgroundColor: "#AFB42B",
    shadowOpacity: 0.7,
    shadowRadius: 20,
    borderRadius: 7,
    padding: 7,
    margin: 10,
  },
  tile: {
    width: 50,
    height: 50,
    borderRadius: 7,
    backgroundColor: "#C0CA33",
    margin: 3
  },
  mapRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  playerBox: {
    borderStyle: 'solid',
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});