import React from 'react'
import { connect } from 'react-redux'

import AddCategory from '../../components/Modal/Categoria/index'
import EditCategory from '../../components/Modal/CategoriaEdit/index'

import { urlBackend, userID, config } from '../../services/urlBackEnd'
import { InsertRequest, GetRequest, DeleteRequest } from '../../components/crudSendAxios/crud'
import { verifySend } from '../../components/verifySendAxios/index'

import { listCategorys } from '../../store/actions/generalCategoryAction'
import { Table, Input, Popconfirm, Icon, message, notification, Spin } from 'antd';

// import SortableTree from 'react-sortable-tree';

// import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import axios from 'axios'

import 'antd/dist/antd.css';
import './styles.scss'

class SelectLote extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            search: '',
            spin: true,


            treeData: []

        }
        this.searchCategory = this.searchCategory.bind(this)
    }

    async deleteAcount(categoriaId) {
        const verify = await DeleteRequest(categoriaId, 'api/categorias')

        if (verify.data === 401)
            return notification.open({
                message: 'SePlaneje - Problemas Exclusão',
                duration: 20,
                description:
                    `Sua Transação não será salva, você não pode excluir uma categoria que esta vinculada a lançamentos, seja despesa ou receita`,
                style: {
                    width: '100%',
                    marginLeft: 335 - 600,
                },
            });

        verifySend(verify.status, 'DELETE', 'Categoria')

        if (verify.status === 200)
            this.requestAPI()
    }


    columns() {
        return [
            {
                title: 'NUMERO',
                dataIndex: 'NUMEROLOTE',
                key: '2'
            },
            {
                title: 'DESCRIÇÃO LOTE',
                dataIndex: 'DESCRLOTE',
                key: '3'
            },
            {
                title: 'AÇÃO',
                key: 'action',
                width: '140px',
                render: category => (
                    <div className='ModeloBotoesGrid'>
                        <span className='ModeloBotoesGridDetalhes' >

                            {(category.ENTRADA === 1) ? <AddCategory data={category} /> : <Icon type="plus-circle" style={{ fontSize: '18px', color: 'grey' }} title='Não é Possivel Adicionar nesse Item' />}
                            {(category.ID !== 2 && category.ID !== 3) ? <EditCategory data={category} /* back={this.back.bind(this)}  */ /> : <Icon type="edit" style={{ fontSize: '18px', color: 'grey' }} title='Não é possivel Editar essse item' />}
                            {(category.ID !== 2 && category.ID !== 3) ?
                                (!category.children) ?
                                    <Popconfirm title="Deseja Realmente Excluir essa Categoria?" onConfirm={() => this.deleteAcount(category.ID)}>
                                        <Icon type="delete" title='Excluir Categoria' style={{ fontSize: '18px', color: '#08c' }} />
                                    </Popconfirm> :
                                    <Icon type="delete" title='Não é possivel Excluir esse Item' style={{ fontSize: '18px', color: 'grey' }} /> :
                                <Icon type="delete" title='Não é possivel Excluir esse Item' style={{ fontSize: '18px', color: 'grey' }} />}
                        </span>
                    </div>
                ),
            }
        ]
    }

    async requestAPI() {

        // const Dados = await GetRequest('api/categorias')

        // if (Dados.status === 402)
        //     return notification.open({
        //         message: 'SePlaneje - Problemas Pagamento',
        //         duration: 20,
        //         description:
        //             `Poxa!!! 
        //                 Foram identificados problemas com o pagamento da sua assinatura, acesse a página de Pagamento ou entre em contato conosco...`,
        //         style: {
        //             width: '100%',
        //             marginLeft: 335 - 600,
        //         },
        //     });

        // const novosDados = Dados.map((data) => {
        //     return { ...data, title: data.DESCR_CATEGORIA, key: data.ID }
        // })

        // const nivel3 = novosDados.filter((DATA) => DATA.NIVEL === 3)
        // const nivel4 = novosDados.filter((DATA) => DATA.NIVEL === 4)
        // const nivel5 = novosDados.filter((DATA) => DATA.NIVEL === 5)
        // const nivel6 = novosDados.filter((DATA) => DATA.NIVEL === 6)

        // const gera5 = nivel5.reduce((novo, n6, i) => {
        //     if (nivel6.filter((data) => n6.ID === data.IDPAI).length > 0)
        //         novo[i].children = nivel6.filter((data) => n6.ID === data.IDPAI)
        //     return novo
        // }, nivel5)

        // const gera4 = nivel4.reduce((novo, n5, i) => {
        //     if (gera5.filter((data) => n5.ID === data.IDPAI).length > 0)
        //         novo[i].children = gera5.filter((data) => n5.ID === data.IDPAI)
        //     return novo
        // }, nivel4)

        // const nivel = nivel3.reduce((novo, n4, i) => {
        //     if (gera4.filter((data) => n4.ID === data.IDPAI).length > 0)
        //         novo[i].children = gera4.filter((data) => n4.ID === data.IDPAI)
        //     return novo
        // }, nivel3)

        // const nivelMaxDespesa = [{
        //     DESCR_CATEGORIA: 'DESPESA',
        //     NIVEL: 2,
        //     TIPO: 1,
        //     TIPODESCR: 'DESPESA',
        //     ENTRADA: 1,
        //     ENTRADADESCR: 'Categoria de Consolidação',
        //     AGREGACAO: "+",
        //     DEPENDENCIA: 1,
        //     ID: 2,
        //     IDPAI: 1,
        //     STATUS: "Ativo",
        //     children: nivel.filter(filtro => filtro.TIPO === 1)
        // }]

        // const nivelMaxReceita = [{
        //     DESCR_CATEGORIA: 'RECEITA',
        //     NIVEL: 2,
        //     TIPO: 2,
        //     TIPODESCR: 'RECEITA',
        //     ENTRADA: 1,
        //     ENTRADADESCR: 'Categoria de Consolidação',
        //     AGREGACAO: "+",
        //     DEPENDENCIA: 1,
        //     ID: 3,
        //     IDPAI: 1,
        //     STATUS: "Ativo",
        //     children: nivel.filter(filtro => filtro.TIPO === 2)
        // }]



        // this.setState({ ...this.state, spin: false, treeData: [...nivelMaxDespesa, ...nivelMaxReceita] })
        // this.props.listCategorys([...nivelMaxDespesa, ...nivelMaxReceita])
    }

    async ImportCategoryDefault() {

        const novosDados = await GetRequest('api/categorias')

        if (novosDados.length > 3) {
            const args = {
                message: 'Não é possivel importar o Plano de Categorias do SePlaneje',
                description:
                    `Não é possivel importar o Plano de Categorias do SePlaneje após ter criado categorias personalizadas ou ter categorias ja com valores lançados.`,
                duration: 6,
            };
            notification.open(args);
        } else {

            const body = {
                idUser: userID()
            }

            const resultStatus = await InsertRequest(body, 'api/categorias/default')

            if (resultStatus === 200) {

                message.success(' O Plano de categorias Padrão do SePlaneje foi importado com Sucesso', 10)
                this.requestAPI()

            } else {
                message.success(' O Plano de categorias Padrão do SePlaneje não pode ser importado, Error ' + resultStatus.status, 10)
            }
        }
    }

    componentDidMount() {
        this.requestAPI()
    }


    searchCategory(event) {
        this.setState({ ...this.state, search: event.target.value })
        this.updateList(event.target.value)
    }

    async updateList(evento) {

        switch (evento) {
            case '':

                this.requestAPI()
                break;

            default:
                const endpoint = `${urlBackend}api/categorias/search/${evento}/${userID()}`
                const result = await axios.get(endpoint, config())
                const categoria = result.data
                this.props.listCategorys(categoria)
                break;
        }
    }




    render() {

        return (<div>
            <Spin size="large" spinning={this.state.spin} />
            <div className='headerCategory'>
                {/* <AddCategory /> */}
                <Popconfirm title="Deseja Importar o Plano de Categorias do SePlaneje?" onConfirm={() => this.ImportCategoryDefault()}>
                    <Icon type="copy" style={{ fontSize: '36px', color: '#08c' }} title='Importar Plano de Categorias Default do SePlaneje' theme="twoTone" />
                </Popconfirm>
                <Input name='categoria' value={this.state.search} onChange={this.searchCategory} placeholder='Procure Aqui o Lote Especifico' />
            </div>

            <div>
                <Table className='table table-action' columns={this.columns()} dataSource={this.props.category} rowKey='ID'
                    pagination={{ pageSize: 100 }} />
            </div>

            {/* <div style={{ height: '500px' }} >
                <SortableTree
                    treeData={this.state.treeData}
                    
                    onChange={treeData => this.setState({ ...this.state, treeData: treeData })}
                    generateNodeProps={rowInfo => ({
                        buttons: [

                            < EditCategory data={rowInfo.node} />

                        ]
                    }
                    )}
                    // nodeContentRenderer={rowInfo => < EditCategory data={rowInfo} />}
                    maxDepth={5}
                />
            </div> */}
        </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = { listCategorys }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectLote)
