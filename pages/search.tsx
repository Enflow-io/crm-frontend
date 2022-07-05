import MainLayout from "../components/Layout/Layout";
import Title from "../components/Layout/Title";
import BlockSubMenu from "../components/Blocks/BlockSubMenu/BlockSubMenu";
import BlocksList from "../components/Blocks/BlocksList/BlocksList";
import React from "react";
import SearchForm from "../components/SearchForm/SearchForm";


const SearchPage = () => {
    return <MainLayout>

        <Title title={'Поиск'}>
            <BlockSubMenu selectedRows={[]}/>
        </Title>

        <SearchForm />


    </MainLayout>
}


export default SearchPage