import { View, ScrollView, StyleSheet, Image, StatusBar } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Loading from "@/components/Loading";
import useFetchUser from "@/hooks/useFetchUser";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {

    const { userData, currentIndex, isLoading, error, previousUser, nextUser } = useFetchUser()
    const [showPassword, setShowPassword] = useState(false)
    const user = userData[currentIndex];
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#0000" barStyle="dark-content" />

            {isLoading && <Loading />}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {
                user &&
                <View style={{ flex: 1 }}>
                    <Card style={styles.card}>
                        <Image source={{ uri: user.picture.large }} style={styles.profileImage} />
                        <Card.Content>
                            <TextInput label="ID" value={user.id.value || "N/A"} disabled style={styles.input} />
                            <TextInput label="UID" value={user.login.uuid} disabled style={[styles.input, { fontSize: 12 }]} />
                            <TextInput label="Name" value={`${user.name.first} ${user.name.last}`}
                                disabled style={styles.input} />
                            <TextInput label="Username" value={user.login.username} disabled style={styles.input} />
                            <TextInput label="Email" value={user.email} disabled style={styles.input} />
                            <TextInput
                                label="Password"
                                value={showPassword ? user.login.password : "••••••••"}
                                secureTextEntry={!showPassword}
                                disabled
                                style={styles.input}
                                right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            />
                        </Card.Content>
                        <Card.Actions style={styles.buttonContainer}>
                            <Button mode={currentIndex !== 0 ? "contained" : "contained-tonal"} onPress={previousUser} style={styles.button}>
                                Previous
                            </Button>
                            <Button mode={currentIndex !== userData.length - 1 ? "contained" : "contained-tonal"} onPress={nextUser} style={styles.button}>
                                Next
                            </Button>
                        </Card.Actions>

                    </Card>
                </View>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
    },
    imageCard: {
        alignItems: "center",
        padding: 15,
        marginBottom: 20,
        width: "100%",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        margin: "auto",
        resizeMode: "contain"
    },
    imageButton: {
        marginTop: 5,
    },
    card: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },

    errorText: {
        color: "red",
        marginBottom: 10,
    },

});

export default Profile;
