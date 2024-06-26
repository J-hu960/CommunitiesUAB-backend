"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var typeorm_1 = require("@nestjs/typeorm");
var throttler_1 = require("@nestjs/throttler");
var users_module_1 = require("./users/users.module");
var user_entity_1 = require("./users/entities/user.entity");
var auth_module_1 = require("./auth/auth.module");
var communities_module_1 = require("./communities/communities.module");
var community_entity_1 = require("./communities/entities/community.entity");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: '21912191-Js',
                    database: 'communitiesUAB',
                    entities: [user_entity_1.Users, community_entity_1.Community],
                    synchronize: false,
                }),
                throttler_1.ThrottlerModule.forRoot([{
                        ttl: 6000,
                        limit: 10
                    }]),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                communities_module_1.CommunitiesModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map