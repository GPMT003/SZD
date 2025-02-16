-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 16. 17:45
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `krons`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `did` bigint(20) UNSIGNED NOT NULL,
  `iid` bigint(20) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `volume` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `articles`
--

INSERT INTO `articles` (`id`, `did`, `iid`, `price`, `volume`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '8000.00', '9.00', '2025-02-16 15:32:41', '2025-02-16 15:32:41'),
(2, 1, 2, '2500.00', '6.00', '2025-02-16 15:32:41', '2025-02-16 15:32:41'),
(3, 1, 3, '6000.00', '8.00', '2025-02-16 15:32:41', '2025-02-16 15:32:41'),
(4, 1, 4, '3500.00', '8.00', '2025-02-16 15:32:41', '2025-02-16 15:32:41'),
(5, 2, 2, '8000.00', '350.00', '2025-02-16 15:33:06', '2025-02-16 15:33:06'),
(6, 2, 2, '6000.00', '250.00', '2025-02-16 15:33:06', '2025-02-16 15:33:06'),
(7, 3, 1, '2900.00', '8000.00', '2025-02-16 15:37:30', '2025-02-16 15:37:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `articlesout`
--

CREATE TABLE `articlesout` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `did` bigint(20) UNSIGNED NOT NULL,
  `iid` bigint(20) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `fifo` decimal(10,2) DEFAULT NULL,
  `average` decimal(10,2) NOT NULL,
  `volume` decimal(10,2) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `articlesout`
--

INSERT INTO `articlesout` (`id`, `did`, `iid`, `price`, `fifo`, `average`, `volume`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 3, '6000.00', NULL, '6000.00', '6.00', NULL, '2025-02-16 15:34:51', '2025-02-16 15:34:51'),
(2, 1, 3, '6000.00', NULL, '6000.00', '4.00', NULL, '2025-02-16 15:34:51', '2025-02-16 15:34:51'),
(3, 1, 2, '7133.00', NULL, '7133.33', '10.00', NULL, '2025-02-16 15:34:51', '2025-02-16 15:34:51'),
(4, 2, 1, '8000.00', NULL, '2900.00', '15.00', NULL, '2025-02-16 15:38:07', '2025-02-16 15:38:07');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `taxNumber` varchar(255) NOT NULL,
  `vatNumber` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `valuationMethod` enum('Fifo','AverageCost','PurchaseCost','AccountingCost') NOT NULL DEFAULT 'Fifo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `companies`
--

INSERT INTO `companies` (`id`, `companyName`, `taxNumber`, `vatNumber`, `location`, `valuationMethod`, `created_at`, `updated_at`) VALUES
(1, 'Saját', '11111111-2-08', 'HU11111111', '1952 Budapest, Gellért 45.', 'AverageCost', '2025-02-16 15:28:44', '2025-02-16 15:28:44');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `DocNumber` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `documents`
--

INSERT INTO `documents` (`id`, `DocNumber`, `path`, `created_at`, `updated_at`) VALUES
(1, 'KONO-000001', '/storage/invoices/invoice_KONO-000001.pdf', '2025-02-16 15:32:43', '2025-02-16 15:32:43'),
(2, 'KONO-000002', '/storage/invoices/invoice_KONO-000002.pdf', '2025-02-16 15:33:07', '2025-02-16 15:33:07'),
(3, 'RNOS-000001', '/storage/invoices/invoice_RNOS-000001.pdf', '2025-02-16 15:34:52', '2025-02-16 15:34:52'),
(4, 'RNOS-000002', '/storage/invoices/invoice_RNOS-000002.pdf', '2025-02-16 15:36:03', '2025-02-16 15:36:03'),
(5, 'KONO-000003', '/storage/invoices/invoice_KONO-000003.pdf', '2025-02-16 15:37:31', '2025-02-16 15:37:31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `indocuments`
--

CREATE TABLE `indocuments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `pid` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `indocuments`
--

INSERT INTO `indocuments` (`id`, `documentId`, `date`, `pid`, `created_at`, `updated_at`) VALUES
(1, 'KONO-000001', '2025-02-01', 1, '2025-02-16 15:32:41', '2025-02-16 15:32:41'),
(2, 'KONO-000002', '2025-02-01', 1, '2025-02-16 15:33:06', '2025-02-16 15:33:06'),
(3, 'KONO-000003', '2025-02-15', 1, '2025-02-16 15:37:30', '2025-02-16 15:37:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `itemNumber` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vatContent` varchar(255) NOT NULL,
  `vtsz` varchar(255) DEFAULT NULL,
  `unit` varchar(255) NOT NULL,
  `purchasePrice` decimal(20,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `purchased_quantity` decimal(25,2) NOT NULL DEFAULT 0.00,
  `purchased_average_cost` decimal(25,2) NOT NULL DEFAULT 0.00,
  `issued_quantity` decimal(25,2) NOT NULL DEFAULT 0.00,
  `issued_average_cost` decimal(25,2) NOT NULL DEFAULT 0.00,
  `cost` decimal(25,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `items`
--

INSERT INTO `items` (`id`, `accountNumber`, `itemNumber`, `name`, `vatContent`, `vtsz`, `unit`, `purchasePrice`, `created_at`, `updated_at`, `purchased_quantity`, `purchased_average_cost`, `issued_quantity`, `issued_average_cost`, `cost`) VALUES
(1, '2111', '2111-01', 'Tégla', '27%', '7306', 'db', '4500.00', '2025-02-16 15:20:22', '2025-02-16 15:38:07', '8000.00', '2900.00', '15.00', '8000.00', '-76500.00'),
(2, '2111', '2111-65', 'Cement', 'FAD', '7650', 'kg', '2500.00', '2025-02-16 15:20:47', '2025-02-16 15:34:51', '615.00', '7133.33', '10.00', '7133.00', '3.30'),
(3, '2111', '2111-03', 'Ragasztó', '0%', '7306', 'kg', '7605.00', '2025-02-16 15:21:21', '2025-02-16 15:34:51', '8.00', '6000.00', '10.00', '6000.00', '0.00'),
(4, '2111', '2111-651', 'Vas', 'FAD', '7306', 'm', '4500.00', '2025-02-16 15:21:54', '2025-02-16 15:32:41', '8.00', '3500.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2024_06_26_132803_create_moves_table', 1),
(4, '2024_06_26_205957_create_partners_table', 1),
(5, '2024_06_26_223625_create_items_table', 1),
(6, '2024_06_27_150038_create_projects_table', 1),
(7, '2024_07_06_163044_create_indocuments_table', 1),
(8, '2024_07_06_163149_create_articles_table', 1),
(9, '2024_07_07_001015_create_articlesout_table', 1),
(10, '2024_07_07_013408_add_columns_to_items_table', 1),
(11, '2024_07_07_013824_create_outdocuments_table', 1),
(12, '2024_11_08_183648_create_companies_table', 1),
(13, '2024_11_09_191843_create_foreign_keys_for_tables', 1),
(14, '2024_11_24_163951_add_new_column_to_moves_table', 1),
(15, '2024_12_21_145841_add_cols_to_users_table', 1),
(16, '2024_12_21_145841_add_is_active_and_role_to_users_table', 1),
(17, '2024_12_21_191418_create_invoices_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `moves`
--

CREATE TABLE `moves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `moveType` varchar(255) NOT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isBV` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `moves`
--

INSERT INTO `moves` (`id`, `moveType`, `accountNumber`, `created_at`, `updated_at`, `isBV`) VALUES
(1, 'Saját felhasználás', '582', '2025-02-16 15:22:11', '2025-02-16 15:22:11', 1),
(2, 'Belföld ÉNÁ', '911', '2025-02-16 15:22:44', '2025-02-16 15:22:44', 0),
(3, 'Selejtezés', '861', '2025-02-16 15:22:57', '2025-02-16 15:22:57', 1),
(4, 'STKÁV', '581', '2025-02-16 15:23:50', '2025-02-16 15:23:50', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `outdocuments`
--

CREATE TABLE `outdocuments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `pid` bigint(20) UNSIGNED DEFAULT NULL,
  `mid` bigint(20) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `outdocuments`
--

INSERT INTO `outdocuments` (`id`, `documentId`, `date`, `pid`, `mid`, `comment`, `created_at`, `updated_at`) VALUES
(1, 'RNOS-000001', '2025-02-15', 1, 4, 'Saját felhasználás céljából 10/1', '2025-02-16 15:34:51', '2025-02-16 15:34:51'),
(2, 'RNOS-000002', '2025-02-22', 2, 2, NULL, '2025-02-16 15:38:07', '2025-02-16 15:38:07');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partners`
--

CREATE TABLE `partners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `taxNumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `partners`
--

INSERT INTO `partners` (`id`, `name`, `taxNumber`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Szerip Zrt.', '14168611-2-08', '1952 Budapest,  Gellért 45.', '2025-02-16 15:18:46', '2025-02-16 15:18:46'),
(2, 'MKVK Kft.', '14168894-2-08', '4035 Debrecen Hisa út 45.', '2025-02-16 15:19:47', '2025-02-16 15:19:47'),
(3, 'Saját', '11111111-2-08', '1952 Budapest,  Gellért 45.', '2025-02-16 15:25:22', '2025-02-16 15:25:22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\User', 1, 'auth_token', '471b8bfb474326a76d8291a2900529baee9b21b678bf5b6a1fd56d8043730f88', '[\"*\"]', NULL, '2025-02-16 15:18:26', '2025-02-16 15:18:26'),
(2, 'App\\User', 2, 'auth_token', '657b7ec8fcf4b946988ce5bf04ae5aabe36a39be2930889673013a7eccb24497', '[\"*\"]', NULL, '2025-02-16 15:31:40', '2025-02-16 15:31:40');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `contract_amount` decimal(15,2) NOT NULL,
  `contractor_name` varchar(255) NOT NULL,
  `partner_id` bigint(20) UNSIGNED NOT NULL,
  `completion_level` int(11) NOT NULL,
  `planned_phases` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `projects`
--

INSERT INTO `projects` (`id`, `name`, `start_date`, `end_date`, `contract_amount`, `contractor_name`, `partner_id`, `completion_level`, `planned_phases`, `created_at`, `updated_at`) VALUES
(1, 'Társasház', '2025-02-01', '2025-02-28', '50000000.00', 'Saját', 2, 50, '\"4\"', '2025-02-16 15:26:48', '2025-02-16 15:26:48'),
(2, 'Eladás', '2025-02-01', '2025-02-28', '900000.00', 'Saját', 3, 1, '\"4\"', '2025-02-16 15:27:46', '2025-02-16 15:27:46');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vtoken` varchar(255) DEFAULT NULL,
  `etime` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `role` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `created_at`, `updated_at`, `vtoken`, `etime`, `is_active`, `role`) VALUES
(1, '1Asdasdasd', '1Asdasdasd@ghg.com', NULL, '$2y$10$fG5T.xFCNLqgDFaP.FP.buk2wfCxKiwdiz7fV0rgVwBJdED0MZiSa', NULL, NULL, NULL, NULL, 1, 1),
(2, '2Bér2', 'mate.barath123@gmail.com', NULL, '$2y$10$ZinGPmceYzAu98q5NuodPOT41usIHkG28lKMAxKhzxdvoYaPhJ0sa', '2025-02-16 15:29:15', '2025-02-16 15:42:19', '', '2025-02-16 16:30:27', 0, 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_did_foreign` (`did`),
  ADD KEY `articles_iid_foreign` (`iid`);

--
-- A tábla indexei `articlesout`
--
ALTER TABLE `articlesout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articlesout_did_foreign` (`did`),
  ADD KEY `articlesout_iid_foreign` (`iid`);

--
-- A tábla indexei `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documents_docnumber_unique` (`DocNumber`);

--
-- A tábla indexei `indocuments`
--
ALTER TABLE `indocuments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indocuments_pid_foreign` (`pid`);

--
-- A tábla indexei `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `moves`
--
ALTER TABLE `moves`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `outdocuments`
--
ALTER TABLE `outdocuments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `outdocuments_mid_foreign` (`mid`),
  ADD KEY `outdocuments_pid_foreign` (`pid`);

--
-- A tábla indexei `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- A tábla indexei `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `articlesout`
--
ALTER TABLE `articlesout`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `indocuments`
--
ALTER TABLE `indocuments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `moves`
--
ALTER TABLE `moves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `outdocuments`
--
ALTER TABLE `outdocuments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_did_foreign` FOREIGN KEY (`did`) REFERENCES `indocuments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_iid_foreign` FOREIGN KEY (`iid`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `articlesout`
--
ALTER TABLE `articlesout`
  ADD CONSTRAINT `articlesout_did_foreign` FOREIGN KEY (`did`) REFERENCES `outdocuments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articlesout_iid_foreign` FOREIGN KEY (`iid`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `indocuments`
--
ALTER TABLE `indocuments`
  ADD CONSTRAINT `indocuments_pid_foreign` FOREIGN KEY (`pid`) REFERENCES `partners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `outdocuments`
--
ALTER TABLE `outdocuments`
  ADD CONSTRAINT `outdocuments_mid_foreign` FOREIGN KEY (`mid`) REFERENCES `moves` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `outdocuments_pid_foreign` FOREIGN KEY (`pid`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
