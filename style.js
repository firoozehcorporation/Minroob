import { StyleSheet } from "react-native";

export default StyleSheet.create({
  p: {
    direction: 'rtl',
    fontFamily: 'vazir',
  },
  b: {
    direction: 'rtl',
    fontFamily: 'vazir-bold',
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E3F2FD',
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
    backgroundColor: "#CDDC39",
    margin: 3
  },
  mapRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  playerBox: {
    borderRadius: 5,
    borderStyle: 'solid',
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000000",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 400,
  },
  button: {
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#7CB342",
    borderBottomWidth: 5,
    borderStyle: 'solid',
    borderColor: "#689F38"
  },
  redBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#ef5350",
    borderBottomWidth: 5,
    borderStyle: 'solid',
    borderColor: "#d32f2f"
  },
  blueBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#29B6F6",
    borderBottomWidth: 5,
    borderStyle: 'solid',
    borderColor: "#0288D1"
  },
  btnOrange: {
    backgroundColor: "#FFA726",
    borderBottomWidth: 5,
    borderStyle: 'solid',
    borderColor: "#FB8C00"
  },
  textInput: {
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius: 7,
    borderBottomWidth: 5, borderColor: "#EEE", borderStyle: 'solid',
    marginBottom: 15,
    padding: 10,
    lineHeight: 2,
    fontFamily: 'vazir',
    fontSize: 18,
    textAlign: 'center'
  }
});