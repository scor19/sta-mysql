import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: 'white',
  },
  textPlaceholder: {
    color: 'green',
    marginBottom: 2,
    marginTop: 15,
    fontWeight: "500",
  },
  inputGroup: {
    flex: 1,
    padding: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  datePickerStyle: {
    flex: 1,
    padding: 9,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  inputElevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGroup: {
    padding: 0,
    marginBottom: 15,
    marginTop: 15
  },
  textTitle: {
    flex: 1,
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
  },
  textTitleSub: {
    flex: 1,
    color: 'gray',
    marginVertical: 10,
  },
  textError: {
    color: 'red',
  },
});

export { styles };
