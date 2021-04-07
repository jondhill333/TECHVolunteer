import Head from 'next/head';
import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    FormHelperText,
    Form,
    Textarea,
    Button,
    Grid,
    GridItem
} from '@chakra-ui/react';
import Link from 'next/link';
import CountrySelector from './CountrySelector';
import SkillsSelector from './SkillsSelector';

import { useUser } from '@auth0/nextjs-auth0';

export default function VolunteerSignupForm() {
    const [form, setForm] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: 'New',
        location: '',
        website: '',
        github: '',
        linkedIn: '',
        twitter: '',
        skills: [],
        description: ''
    });

    function handleChange(e) {
        const checkedArr = [];
        if (e.target.type !== 'checkbox') {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        } else {
            const checkeds = document.getElementsByTagName('input');
            for (let i = 0; i < checkeds.length; i++) {
                if (checkeds[i].checked) {
                    checkedArr.push(checkeds[i].value);
                }
            }
            setForm({
                ...form,
                skills: checkedArr
            });
        }
    }

    async function create() {
        try {
            const res = await fetch(`http://localhost:3000/api/devs`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            //TODO - decide on where to redirect to an update below
            //   router.push(`/project/${currentProject.id}/taskview`);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        create();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid templateColumns="1fr 1fr 1fr" columnGap={20} color="black">
                    <GridItem mx={2}>
                        <FormControl id="username" isRequired my={2}>
                            <FormLabel>User name</FormLabel>
                            <Input
                                placeholder="Choose username "
                                name="username"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="first_name" isRequired my={2}>
                            <FormLabel>First name</FormLabel>
                            <Input
                                placeholder="Enter first name"
                                name="first_name"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="last_name" isRequired my={2}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                placeholder="enter last name"
                                name="last_name"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired my={2}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="country" my={2}>
                            <FormLabel>Country</FormLabel>
                            <CountrySelector onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl id="website" my={2}>
                            <FormLabel>Website</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your website url"
                                name="website"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="github" my={2}>
                            <FormLabel>Github</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your Github"
                                name="github"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="linkedin" my={2}>
                            <FormLabel>Linkedin</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your linkedin"
                                name="linkedin"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="twitter" my={2}>
                            <FormLabel>Twitter</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your twitter handle"
                                name="twitter"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl id="skills" my={2}>
                            <FormLabel>Skills</FormLabel>
                            <FormHelperText mb={1}>
                                We recommend to pick up to 4 that you are most confident with
                            </FormHelperText>
                            <SkillsSelector onChange={handleChange} />
                        </FormControl>
                        <FormControl id="description" my={2}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                maxlength="150"
                                placeholder="Write a sentance or two about yourself "
                                name="description"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button mt={4} colorScheme="teal" type="submit">
                            Submit
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </>
    );
}
