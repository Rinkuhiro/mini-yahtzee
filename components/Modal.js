import React from "react";
import styles from "../style/style";
import { Text, Pressable, View } from "react-native";

const Modal = ({ setIsOpen }) => {
    return (
      <>
        <View className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <View className={styles.centered}>
          <View className={styles.modal}>
            <View className={styles.modalHeader}>
              <Text className={styles.heading}>Dialog</Text>
            </View>
            <Pressable style={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <Text>F</Text>
            </Pressable>
            <View className={styles.modalContent}>
              <Text>Are you sure you want to delete the item?</Text>
            </View>
            <View className={styles.modalActions}>
              <View className={styles.actionsContainer}>
                <Pressable className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                  <Text>Delete</Text>
                </Pressable>
                <Pressable
                  className={styles.cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };
  
  export default Modal;