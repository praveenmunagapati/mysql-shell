/*
 * Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

// Interactive Table access module
// (the one exposed as the table members of the db object in the shell)

#ifndef _MOD_MYSQLX_COLLECTION_H_
#define _MOD_MYSQLX_COLLECTION_H_

#include "base_database_object.h"
#include "shellcore/types.h"
#include "shellcore/types_cpp.h"
#include "mysqlx_crud.h"

#include "mod_mysqlx_collection_add.h"
#include "mod_mysqlx_collection_remove.h"
#include "mod_mysqlx_collection_find.h"
#include "mod_mysqlx_collection_modify.h"

namespace mysh
{
  namespace mysqlx
  {
    class Schema;

    /**
    * Represents a Collection on an Schema, retrieved with a session created using the X Protocol.
    * \todo Implement and document as()
    * \todo Implement and document createIndex()
    * \todo Implement and document dropIndex()
    * \todo Implement and document getIndexes()
    * \todo Implement and document newDoc()
    * \todo Implement and document count()
    * \todo Implement and document drop()
    */
    class Collection : public DatabaseObject, public boost::enable_shared_from_this<Collection>
    {
    public:
      Collection(boost::shared_ptr<Schema> owner, const std::string &name);
      Collection(boost::shared_ptr<const Schema> owner, const std::string &name);
      ~Collection();

      virtual std::string class_name() const { return "Collection"; }

    private:
      shcore::Value add_(const shcore::Argument_list &args);
      shcore::Value find_(const shcore::Argument_list &args);
      shcore::Value modify_(const shcore::Argument_list &args);
      shcore::Value remove_(const shcore::Argument_list &args);

      void init();

#ifdef DOXYGEN
      // TODO: these are not generated in doxygen becuase they are private.
      Collection add(document doc);
      Collection add({ document }, { document }, ...);
      Collection find(String searchCriteria);
      Collection modify(String searchCondition);
      Collection remove(String searchCondition);
#endif

    private:
      boost::shared_ptr< ::mysqlx::Collection> _collection_impl;

      // Allows initial functions on the CRUD operations
      friend shcore::Value CollectionAdd::add(const shcore::Argument_list &args);
      friend shcore::Value CollectionFind::find(const shcore::Argument_list &args);
      friend shcore::Value CollectionRemove::remove(const shcore::Argument_list &args);
      friend shcore::Value CollectionModify::modify(const shcore::Argument_list &args);
    };
  }
}

#endif
