import React from 'react'

const Layout = () => {
  return (
    <>
        <Layout className='container'>
            <Sider theme='light' >
              <SideBar />
            </Sider>
            <Layout>
              <Header>
                <Row justify='space-between'>
                  <Col>
                    <NavBar />
                  </Col>
                  <Col>
                    <Switch checkedChildren="Light Mode" unCheckedChildren="Dark Mode" checked={theme === "dark" ? true : false} onChange={changeTheme} />
                  </Col>
                </Row>


              </Header>
              <Content>
                <Row justify='center'>
                  <Col span={22} style={{paddingTop: '20px'}}>
                  <AppRoutes />
                  </Col>
                </Row>
                
              </Content>

              <Footer>Footer</Footer>
            </Layout>

          </Layout>
    </>
  )
}

export default Layout