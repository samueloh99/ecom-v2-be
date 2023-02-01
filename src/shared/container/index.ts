import { container, delay } from "tsyringe";

import "@modules/usuarios/providers";
import "@shared/container/providers";

import ICategoriesRepository from "@modules/categorias/repositories/ICategoriasRepository";
import CategoriasRepository from "@modules/categorias/infra/typeorm/repositories/CategoriasRepository";

import IProdutosRepository from "@modules/produtos/repositories/IProdutosRepository";
import ProdutosRepository from "@modules/produtos/infra/typeorm/repositories/ProdutosRepository";

import IMarcasRepository from "@modules/marcas/repositories/IMarcasRepository";
import MarcasRepository from "@modules/marcas/infra/typeorm/repositories/MarcasRepository";

import IFornecedoresRepository from "@modules/fornecedores/repositories/IFornecedoresRepository";
import FornecedoresRepository from "@modules/fornecedores/infra/typeorm/repositories/FornecedoresRepository";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import SkusRepository from "@modules/skus/infra/typeorm/repositories/SkusRepository";

import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import UsuariosRepository from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepository";

import IVariacoesRepository from "@modules/variacoes/repositories/IVariacoesRepository";
import VariacoesRepository from "@modules/variacoes/infra/typeorm/repositories/VariacoesRepository";

import IMovimentacoesRepository from "@modules/movimentacoes/repositories/IMovimentacoesRepository";
import MovimentacoesRepository from "@modules/movimentacoes/infra/typeorm/repositories/MovimentacoesRepository";

import IPedidosRepository from "@modules/pedidos/repositories/IPedidosRepository";
import PedidosRepository from "@modules/pedidos/infra/typeorm/repositories/PedidosRepository";

import IPedidosProdutosRepository from "@modules/pedidosProdutos/repositories/IPedidosProdutosRepository";
import PedidosProdutosRepository from "@modules/pedidosProdutos/infra/typeorm/repositories/PedidosProdutosRepository";

import IUsuarioTokensRepository from "@modules/usuarios/repositories/IUsuarioTokensRepository";
import UsuarioTokensRepository from "@modules/usuarios/infra/typeorm/repositories/UsuarioTokenRepository";

import IRefreshTokenRepository from "@modules/usuarios/repositories/IRefreshTokenRepository";
import RefreshTokenRepository from "@modules/usuarios/infra/typeorm/repositories/RefreshTokenRepository";

import IRolesRepository from "@modules/usuarios/repositories/IRolesRepository";
import RolesRepository from "@modules/usuarios/infra/typeorm/repositories/RolesRepository";

import IPermissoesRepository from "@modules/usuarios/repositories/IPermissoesRepository";
import PermissoesRepository from "@modules/usuarios/infra/typeorm/repositories/PermissoesRepository";

import IFavoritosRepository from "@modules/skus/repositories/IFavoritosRepository";
import FavoritosRepository from "@modules/skus/infra/typeorm/repositories/FavoritosRepository";

import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";
import DescontosRepository from "@modules/produtos/infra/typeorm/repositories/DescontosRepository";

import IEnderecosRepository from "@modules/usuarios/repositories/IEnderecosRepository";
import EnderecosRepository from "@modules/usuarios/infra/typeorm/repositories/EnderecosRepository";

import IBlingClientsProvider from "@shared/container/providers/BlingERP/models/IBlingClientsProvider";
import BlingClientsProvider from "@shared/container/providers/BlingERP/implementations/BlingClientsProvider";

import IBlingCategoriesProvider from "@shared/container/providers/BlingERP/models/IBlingCategoriesProvider";
import BlingCategoriesProvider from "@shared/container/providers/BlingERP/implementations/BlingCategoriesProvider";

import IBlingProductsProvider from "@shared/container/providers/BlingERP/models/IBlingProductsProvider";
import BlingProductsProvider from "@shared/container/providers/BlingERP/implementations/BlingProductsProvider";

import IBlingStockProvider from "@shared/container/providers/BlingERP/models/IBlingStockProvider";
import BlingStocksProvider from "@shared/container/providers/BlingERP/implementations/BlingStocksProvider";

import IBlingOrdersProvider from "@shared/container/providers/BlingERP/models/IBlingOrdersProvider";
import BlingOrdersProvider from "@shared/container/providers/BlingERP/implementations/BlingOrdersProvider";

import IErpsRepository from "@modules/configuracoes/repositories/IErpsRepository";
import ErpsRepository from "@modules/configuracoes/infra/typeorm/repositories/ErpsRepository";

import ICorreiosRepository from "@modules/configuracoes/repositories/ICorreiosRepository";
import CorreiosRepository from "@modules/configuracoes/infra/typeorm/repositories/CorreiosRepository";

import IPagamentosRepository from "@modules/configuracoes/repositories/IPagamentosRepository";
import PagamentosRepository from "@modules/configuracoes/infra/typeorm/repositories/PagamentosRepository";

import IParcelasRepository from "@modules/configuracoes/repositories/IParcelasRepository";
import ParcelasRepository from "@modules/configuracoes/infra/typeorm/repositories/ParcelasRepository";

import IFretesRepository from "@modules/configuracoes/repositories/IFretesRepository";
import FretesRepository from "@modules/configuracoes/infra/typeorm/repositories/FretesRepository";

import ISeoSociaisRepository from "@modules/configuracoes/repositories/ISeoSociaisRepository";
import SeoSociaisRepository from "@modules/configuracoes/infra/typeorm/repositories/SeoSociaisRepository";

import IDepositosRepository from "@modules/configuracoes/repositories/IDepositosRepository";
import DepositosRepository from "@modules/configuracoes/infra/typeorm/repositories/DepositosRepository";

import ICuponsRepository from "@modules/cupons/repositories/ICuponsRepository";
import CuponsRepository from "@modules/cupons/infra/typeorm/repositories/CuponsRepository";

import ICarteirasRepository from "@modules/usuarios/repositories/ICarteirasRepository";
import CarteirasRepository from "@modules/usuarios/infra/typeorm/repositories/CarteirasRepository";

import ILogsRepository from "@modules/logs/repositories/ILogsRepository";
import LogsRepository from "@modules/logs/infra/typeorm/repositories/LogsRepository";

import ITransmissionsRepository from "@modules/checkout/repositories/ITransmissionsRepository";
import TransmissionsRepository from "@modules/checkout/infra/typeorm/repositories/TransmissionsRepository";

container.registerSingleton<ITransmissionsRepository>(
  "TransmissionsRepository",
  TransmissionsRepository,
);

container.registerSingleton<ILogsRepository>(
  "LogsRepository",
  delay(() => LogsRepository),
);

container.registerSingleton<IEnderecosRepository>(
  "EnderecosRepository",
  EnderecosRepository,
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriasRepository",
  CategoriasRepository,
);

container.registerSingleton<IFavoritosRepository>(
  "FavoritosRepository",
  FavoritosRepository,
);

container.registerSingleton<IProdutosRepository>(
  "ProdutosRepository",
  ProdutosRepository,
);

container.registerSingleton<IMarcasRepository>(
  "MarcasRepository",
  MarcasRepository,
);

container.registerSingleton<IFornecedoresRepository>(
  "FornecedoresRepository",
  FornecedoresRepository,
);

container.registerSingleton<ISkusRepository>("SkusRepository", SkusRepository);

container.registerSingleton<IUsuariosRepository>(
  "UsuariosRepository",
  UsuariosRepository,
);

container.registerSingleton<IVariacoesRepository>(
  "VariacoesRepository",
  VariacoesRepository,
);

container.registerSingleton<IMovimentacoesRepository>(
  "MovimentacoesRepository",
  MovimentacoesRepository,
);

container.registerSingleton<IPedidosRepository>(
  "PedidosRepository",
  PedidosRepository,
);

container.registerSingleton<IPedidosProdutosRepository>(
  "PedidosProdutosRepository",
  delay(() => PedidosProdutosRepository),
);

container.registerSingleton<IUsuarioTokensRepository>(
  "UsuarioTokensRepository",
  UsuarioTokensRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  "RefreshTokenRepository",
  RefreshTokenRepository,
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);

container.registerSingleton<IPermissoesRepository>(
  "PermissoesRepository",
  PermissoesRepository,
);

container.registerSingleton<IDescontosRepository>(
  "DescontosRepository",
  DescontosRepository,
);

container.registerSingleton<IBlingClientsProvider>(
  "BlingClientsProvider",
  BlingClientsProvider,
);

container.registerSingleton<IBlingCategoriesProvider>(
  "BlingCategoriesProvider",
  BlingCategoriesProvider,
);

container.registerSingleton<IBlingProductsProvider>(
  "BlingProductsProvider",
  BlingProductsProvider,
);

container.registerSingleton<IBlingStockProvider>(
  "BlingStocksProvider",
  BlingStocksProvider,
);

container.registerSingleton<IBlingOrdersProvider>(
  "BlingOrdersProvider",
  BlingOrdersProvider,
);

container.registerSingleton<IErpsRepository>("ErpsRepository", ErpsRepository);

container.registerSingleton<ICorreiosRepository>(
  "CorreiosRepository",
  CorreiosRepository,
);

container.registerSingleton<IParcelasRepository>(
  "ParcelasRepository",
  ParcelasRepository,
);

container.registerSingleton<IDepositosRepository>(
  "DepositosRepository",
  DepositosRepository,
);

container.registerSingleton<IPagamentosRepository>(
  "PagamentosRepository",
  PagamentosRepository,
);

container.registerSingleton<IFretesRepository>(
  "FretesRepository",
  FretesRepository,
);

container.registerSingleton<ISeoSociaisRepository>(
  "SeoSociaisRepository",
  SeoSociaisRepository,
);

container.registerSingleton<ICuponsRepository>(
  "CuponsRepository",
  delay(() => CuponsRepository),
);

container.registerSingleton<ICarteirasRepository>(
  "CarteirasRepository",
  delay(() => CarteirasRepository),
);
