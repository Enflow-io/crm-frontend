import MainLayout from "../components/Layout/Layout";
import Title from "../components/Layout/Title";
import BlockSubMenu from "../components/Blocks/BlockSubMenu/BlockSubMenu";
import BlocksList from "../components/Blocks/BlocksList/BlocksList";
import React from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import QueryBuilder from "../components/Search/QueryBuilder";
import SearchPageCont from "../components/Search/SearchPageCont";


const SearchPage = () => {
    return <MainLayout>

        <Title title={'Поиск'}>
            {/*<BlockSubMenu selectedRows={[]}/>*/}
        </Title>

        {/*<SearchForm />*/}
        <SearchPageCont />

    </MainLayout>
}


export default SearchPage