import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const [index, setIndex] = useState<number | null>(null);

  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todo, input]);
      setInput("");
    } else {
      Alert.alert("Please enter a valid todo.");
    }
  };

  const deleteTodo = (index: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const newTodos = todo.filter((_, i) => i !== index);
          setTodo(newTodos);
        },
      },
    ]);
  };

  const editTodo = () => {
    if (index !== null && updateInput.trim()) {
      const updatedTodos = todo.map((item, i) =>
        i === index ? updateInput : item
      );
      setTodo(updatedTodos);
      setModalVisible(false);
      setUpdateInput("");
    } else {
      Alert.alert("Please enter a valid update.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter task"
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={styles.list}
          data={todo}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setIndex(index);
                    setUpdateInput(item);
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTodo(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodo}>No Todo Found...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo!</Text>
            <TextInput
              style={styles.updateInput}
              onChangeText={setUpdateInput}
              value={updateInput}
              placeholder="Update todo"
            />
            <Pressable style={styles.updateButton} onPress={editTodo}>
              <Text style={styles.buttonText}>Update Todo</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5A37",
    padding: 20,
    color: "white",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
    color: "white",
    fontWeight: "900",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
  },
  list: {
    marginTop: 10,
  },
  item: {
    backgroundColor: "maroon",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#FF9800",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  noTodo: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  updateInput: {
    height: 50,
    borderColor: "black",
    color: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: 200,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    width: 150,
  },
  cancelButton: {
    backgroundColor: "#FF9800",
    borderRadius: 10,
    paddingVertical: 10,
    width: 150,
  },
});

export default Home;
