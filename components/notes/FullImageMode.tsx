import { View, Modal, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";


import { Image } from "expo-image";
import { useTheme } from "@/hooks/useTheme";
import { profileScreenStyles } from "@/style/profile.stlye";

type Props = {
  visible: boolean;
  imageUrl: string | null;
  setVisible: (v: boolean) => void;
};

export default function FullImageModal({
  visible,
  imageUrl,
  setVisible,
}: Props) {
    const { theme } = useTheme();
  
    const styles = profileScreenStyles(theme);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.postDetailContainer}>
          
          <View style={styles.postDetailHeader}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: imageUrl ?? "" }}
            style={styles.postDetailImage}
            contentFit="cover"
            transition={200}
          />
        </View>
      </View>
    </Modal>
  );
}