-- v1 迁移脚本：初版表结构 → 知栈领域命名（2026-10-16 已在 live 库执行）
RENAME TABLE tb_shop TO tb_activity, tb_shop_type TO tb_activity_category, tb_voucher TO tb_ticket, tb_seckill_voucher TO tb_seckill_ticket, tb_voucher_order TO tb_ticket_order, tb_blog TO tb_post, tb_blog_comments TO tb_post_comments, tb_user_info TO tb_user_profile;
ALTER TABLE tb_ticket CHANGE shop_id activity_id BIGINT NOT NULL;
ALTER TABLE tb_seckill_ticket CHANGE voucher_id ticket_id BIGINT NOT NULL;
ALTER TABLE tb_ticket_order CHANGE voucher_id ticket_id BIGINT NOT NULL;
ALTER TABLE tb_post CHANGE shop_id activity_id BIGINT NOT NULL;
ALTER TABLE tb_post_comments CHANGE blog_id post_id BIGINT NOT NULL;
ALTER TABLE tb_ticket_order ADD UNIQUE INDEX uk_user_ticket(user_id, ticket_id);
