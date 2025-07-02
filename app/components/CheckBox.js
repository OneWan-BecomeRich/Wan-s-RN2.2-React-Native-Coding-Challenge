import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/* props:
    - onPress: function to call when the checkbox is pressed
    - isChecked: boolean to determine if the checkbox is checked or not
    - checkBoxColor: color of the checkbox icon
    - title: text to display next to the checkbox
    - titleStyle: style for the text next to the checkbox
 */
const CheckBox = (props) => {
    // variable to switch between the checked/unchecked icons
    const iconName = props.isChecked ? "checkbox-marked" : "checkbox-blank-outline";

    // returns a checkbox icon with text to the right
    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color={props.checkBoxColor} />
            </Pressable>
            <Text style={[props.titleStyle, styles.title]}>{props.title}</Text>
        </View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 20
    },
    title: {
        marginLeft: 10,
    },
});