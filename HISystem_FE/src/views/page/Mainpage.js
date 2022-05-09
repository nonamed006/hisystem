import MainHeader from 'components/Headers/MainHeader';
import KandanBoard from 'components/main/KandanBoard';
import TodoListCard from 'components/todoList/TodoListCard';
import React from 'react';

const Mainpage = () => {
    return (
        <div>
            <MainHeader />
            {/* <TodoListCard></TodoListCard> */}
            <KandanBoard></KandanBoard>
        </div>
    );
};

export default Mainpage;