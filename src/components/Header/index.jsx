import React from 'react';
import { FlexBox, Alignment } from '@lumx/react';
import Search from '../Search';

function Header() {
  return (
	<header className="lumx-spacing-padding-big header">
		<FlexBox vAlign={Alignment.spaceBetween} className="header-content">
			<img className="logo" src={`${process.env.PUBLIC_URL}/marvel_logo.svg`} alt="Marvel logo" />
			<Search />
		</FlexBox>
	</header>
  );
}

export default Header;
