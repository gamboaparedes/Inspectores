
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
    viewBody:{
        flex: 1,
        backgroundColor: "#fff",
    },
    searchBar:{
        marginBottom: 20, 
      },
      btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
      },
      buttonTouchable:{
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      buttonTextStyle:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      textTitle:{
        fontWeight: 'bold',
        fontSize: 18,
        textAlignVertical: "center",
        textAlign: "center",
        backgroundColor: 'yellow',
      },
      descText:{
        marginBottom:20
      }
    });