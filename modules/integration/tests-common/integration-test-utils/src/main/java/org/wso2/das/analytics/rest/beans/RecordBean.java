/**
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.wso2.das.analytics.rest.beans;

import javax.xml.bind.annotation.*;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The Class RecordBean.
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"id", "tableName", "timestamp", "values"})
@XmlRootElement(name = "record")
public class RecordBean {

    /**
     * The table name.
     */
    @XmlElement(required = false)
    private String tableName;

    /**
     * The values.
     */
    @XmlElement(required = true)
    private Map<String, Object> values;

    /**
     * The timestamp.
     */
    @XmlElement(required = false, nillable = true)
    private Long timestamp;

    /**
     * The id.
     */
    @XmlElement(required = false)
    private String id;

    /**
     * Gets the id.
     *
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the id.
     *
     * @param id the new id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the table name.
     *
     * @return the table name
     */
    public String getTableName() {
        return tableName;
    }

    /**
     * Sets the table name.
     *
     * @param tableName the new table name
     */
    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    /**
     * Gets the values.
     *
     * @return the values
     */
    public Map<String, Object> getValues() {
        return values;
    }

    /**
     * Sets the values.
     *
     * @param values the values
     */
    public void setValues(Map<String, Object> values) {
        this.values = values;
    }

    /**
     * Gets the value.
     *
     * @param name the name
     * @return the value
     */
    public Object getValue(String name) {
        return this.values.get(name);
    }

    /**
     * Gets the timestamp.
     *
     * @return the timestamp
     */
    public long getTimestamp() {
        return timestamp.longValue();
    }

    /**
     * Sets the timestamp.
     *
     * @param timestamp the new timestamp
     */
    public void setTimestamp(long timestamp) {
        this.timestamp = new Long(timestamp);
    }

    /**
     * Gets the not null values.
     *
     * @return the not null values
     */
    public Map<String, Object> getNotNullValues() {
        Map<String, Object> result = new LinkedHashMap<String, Object>(this.getValues());
        Iterator<Map.Entry<String, Object>> itr = result.entrySet().iterator();
        while (itr.hasNext()) {
            if (itr.next().getValue() == null) {
                itr.remove();
            }
        }
        return result;
    }
}
