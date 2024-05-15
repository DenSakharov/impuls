import React from 'react';

function Header() {
    return(
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">СУИ “Импульс”</span>
                <div className="mdl-layout-spacer"></div>
                <span>Пользователь: Иванов П.В. ( <a href="#" className="mdl-layout-href">Выйти</a> )</span>
            </div>
        </header>
    )
}

export default Header;