import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn to your account</Text>
      <Link href={'/(auth)/sign-in'}>Sign In</Link>
    </View>
  )
}

export default SignIn