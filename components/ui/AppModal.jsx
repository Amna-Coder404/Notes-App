import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppModal = ({
    visible,
    onRequestClose,
    children,
    backgroundColor = "black",
    animationType = "slide",
}) => {
    return (
        <Modal
            visible={visible}
            animationType={animationType}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor,
                }}
            >
                {children}
            </SafeAreaView>
        </Modal>
    );
};

export default AppModal;