import { Router } from "express";

import produtoRouter from "@modules/produtos/infra/http/routes/produtos.routes";
import skusRouter from "@modules/skus/infra/http/routes/skus.routes";
import marcasRouter from "@modules/marcas/infra/http/routes/marcas.routes";
import categoriasRouter from "@modules/categorias/infra/http/routes/categorias.routes";
import fornecedoresRouter from "@modules/fornecedores/infra/http/routes/fornecedores.routes";
import variacoesRouter from "@modules/variacoes/infra/http/routes/variacao.routes";
import usuariosRouter from "@modules/usuarios/infra/http/routes/usuarios.routes";
import sessionsRouter from "@modules/usuarios/infra/http/routes/sessions.routes";
import movimentacoesRouter from "@modules/movimentacoes/infra/http/routes/movimentacoes.routes";
import pedidosRouter from "@modules/pedidos/infra/http/routes/pedidos.routes";
import pedidosProdutosRouter from "@modules/pedidosProdutos/infra/http/routes/pedidosprodutos.routes";
import profileRouter from "@modules/usuarios/infra/http/routes/perfil.routes";
import refresh_tokenRouter from "@modules/usuarios/infra/http/routes/refresh_token.routes";
import permissoesRouter from "@modules/usuarios/infra/http/routes/permissoes.routes";
import rolesRouter from "@modules/usuarios/infra/http/routes/roles.routes";
import favoritosRouter from "@modules/skus/infra/http/routes/favoritos.routes";
import descontosRouter from "@modules/produtos/infra/http/routes/descontos.routes";
import enderecosRouter from "@modules/usuarios/infra/http/routes/enderecos.routes";
import correiosRouter from "@shared/container/providers/Correios/routes/correios.routes";
import erpsRouter from "@modules/configuracoes/infra/http/routes/erps.routes";
import pagamentosRouter from "@modules/configuracoes/infra/http/routes/pagamentos.routes";
import parcelasRouter from "@modules/configuracoes/infra/http/routes/parcelas.routes";
import depositosRouter from "@modules/configuracoes/infra/http/routes/depositos.routes";
import fretesRouter from "@modules/configuracoes/infra/http/routes/fretes.routes";
import correiosConfigRouter from "@modules/configuracoes/infra/http/routes/correios.routes";
import seosociaisRouter from "@modules/configuracoes/infra/http/routes/seosociais.routes";
import cuponsRouter from "@modules/cupons/infra/http/routes/cupons.routes";
import carteirasRouter from "@modules/usuarios/infra/http/routes/carteiras.routes";
import logsRouter from "@modules/logs/infra/http/routes/logs.routes";
import checkoutRouter from "@modules/checkout/infra/http/routes/checkout.routes";

const routes = Router();

routes.use("/produtos", produtoRouter);

routes.use("/skus", skusRouter);

routes.use("/marcas", marcasRouter);

routes.use("/categorias", categoriasRouter);

routes.use("/fornecedores", fornecedoresRouter);

routes.use("/variacoes", variacoesRouter);

routes.use("/usuarios", usuariosRouter);

routes.use("/sessions", sessionsRouter);

routes.use("/movimentacoes", movimentacoesRouter);

routes.use("/pedidos", pedidosRouter);

routes.use("/pedidosProdutos", pedidosProdutosRouter);

routes.use("/perfil", profileRouter);

routes.use("/refresh_token", refresh_tokenRouter);

routes.use("/roles", rolesRouter);

routes.use("/permissoes", permissoesRouter);

routes.use("/favoritos", favoritosRouter);

routes.use("/descontos", descontosRouter);

routes.use("/carteiras", carteirasRouter);

routes.use("/enderecos", enderecosRouter);

routes.use("/correios", correiosRouter);

routes.use("/checkout", checkoutRouter);

routes.use(
  "/configuracoes",
  erpsRouter,
  pagamentosRouter,
  parcelasRouter,
  depositosRouter,
  fretesRouter,
  correiosConfigRouter,
  seosociaisRouter,
);

routes.use("/cupons", cuponsRouter);

routes.use("/logs", logsRouter);

export default routes;
