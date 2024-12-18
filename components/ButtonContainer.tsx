import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ListRenderItem,
} from "react-native";

// Definisco il tipo per le props: stringhe
interface Lang {
  id: string;
  name: string;
}
// Def. il tipo per data: Oggetto
interface LangButtonContainer {
  data: Lang[];
}

const ButtonContainer: React.FC<LangButtonContainer> = ({ data }) => {
  // const renderItem = ({ item }: { item: Lang }) => (
  // Correzione ChatGPT
  const renderItem: ListRenderItem<Lang> = ({ item }) => (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => {
          // log del button della lingua selezionata
          console.log(item.name);
        }}
      >
        <Text style={styles.buttonText}>{item.name}</Text>
      </Pressable>
    </View>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={{
        flexDirection: "row",
        gap: 50,
      }}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: "rgb(202,202,202)",
    color: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  list: {
    flexGrow: 0,
  },
});

export default ButtonContainer;
